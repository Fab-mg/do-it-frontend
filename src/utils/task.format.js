export const formatDescription = (description) => {
  if (!description || description.length < 50) {
    return description;
  } else {
    let newDesc = description.slice(0, 50);
    return newDesc + "...";
  }
};

export const formatTitle = (title) => {
  if (!title || title.length < 30) {
    return title;
  } else {
    let newTitle = title.slice(0, 30);
    return newTitle + "...";
  }
};
