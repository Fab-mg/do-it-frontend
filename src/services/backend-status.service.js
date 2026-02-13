import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const pingEndpoint = async (endpoint, requestTimeoutMs) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await axios.get(`${apiUrl}${endpoint}`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json,text/plain,*/*",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });
    return {
      reachable: true,
      status: response.status,
      endpoint,
    };
  } catch (error) {
    return {
      reachable: false,
      status: null,
      endpoint,
      error,
    };
  } finally {
    clearTimeout(timeoutId);
  }
};

export const checkBackendStatus = async ({ requestTimeoutMs = 65000 } = {}) => {
  const endpoints = ["/health", "/"];

  for (const endpoint of endpoints) {
    const result = await pingEndpoint(endpoint, requestTimeoutMs);
    if (result.reachable) {
      return {
        ...result,
        awake: result.status < 500,
      };
    }
  }

  return {
    awake: false,
    reachable: false,
    status: null,
  };
};

export const waitForBackendToWake = async ({
  maxAttempts = 10,
  pollIntervalMs = 7000,
  requestTimeoutMs = 65000,
  onPoll,
} = {}) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (onPoll) {
      onPoll({
        attempt,
        maxAttempts,
      });
    }

    const status = await checkBackendStatus({ requestTimeoutMs });
    if (status.awake) {
      return {
        ready: true,
        attempt,
        ...status,
      };
    }

    if (attempt < maxAttempts) {
      await delay(pollIntervalMs);
    }
  }

  return {
    ready: false,
    attempt: maxAttempts,
    awake: false,
    reachable: false,
    status: null,
  };
};
