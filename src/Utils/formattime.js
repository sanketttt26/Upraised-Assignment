// This function helps to convert the machine time to a human-readable format
const formatTime = (time) => {
    if (time < 60) {
      return time < 10 ? `0${time}s` : `${time}s`;
    } else {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}m${seconds < 10 ? '0' : ''}${seconds}s`;
    }
  };
  
  export { formatTime };
  