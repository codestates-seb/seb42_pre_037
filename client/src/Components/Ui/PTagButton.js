function DeleteButton({ children, ...rest }) {
  return (
    <p className=" cursor-pointer" role="presentation" {...rest}>
      {children}
    </p>
  );
}

export default DeleteButton;
