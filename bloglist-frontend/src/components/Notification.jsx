import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <>
      <div
        className={
          notification !== null && notification.type === true
            ? "notification"
            : null
        }
      >
        {notification && notification.type === true ? notification.msg : null}
      </div>
      <div
        className={
          notification !== null && notification.type === false ? "error" : null
        }
      >
        {notification && notification.type === false ? notification.msg : null}
      </div>
    </>
  );
};

export default Notification;
