const Message = ({ message }) => {
  return (
    <div>
      <div className="flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full">
        <p className="mt-[-4rem] text-gray-600 text-xs">Anonymous</p>
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default Message;
