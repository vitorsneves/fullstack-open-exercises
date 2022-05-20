import styles from "./styles.module.css";

const MessageBox = ({ message }) => {
  if (message.content === "") {
    return null;
  }

  const container = `${styles.container} ${
    message.wasSuccessful ? styles.success : styles.error
  }`;

  return <div className={container}>{message.content}</div>;
};

export default MessageBox;
