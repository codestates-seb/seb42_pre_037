function Input({
  id,
  type = 'text',
  label,
  placeholder,
  disabled,
  className,
  ...rest
}) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label htmlFor={id} className="mb-2 font-medium text-gray-700">
        {label}
      </label>
      <input
        {...rest}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          disabled ? 'bg-gray-100' : 'bg-white'
        } ${className}`}
      />
    </div>
  );
}
export default Input;
