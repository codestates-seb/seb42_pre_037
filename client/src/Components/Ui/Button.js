function Button({
  children,
  color = 'blue',
  size = 'medium',
  icon,
  iconClassName,
  ...rest
}) {
  let backgroundColorClass;
  let textColorClass;
  let fontSizeClass;
  let paddingClass;
  let borderRadiusClass;

  // 색상에 따른 클래스 이름 결정
  switch (color) {
    case 'clear-blue':
      backgroundColorClass =
        'bg-[#E1ECF4] hover:bg-[#B3D3EA] focus:bg-[#B3D3EA] border-2 border-[#79A7C7]';
      textColorClass = 'text-[#39739C]';
      break;
    case 'gray':
      backgroundColorClass =
        'bg-gray-500 hover:bg-[#0074CC] focus:ring-gray-400';
      textColorClass = 'text-white';
      break;
    case 'red':
      backgroundColorClass = 'bg-red-500 hover:bg-red-600 focus:ring-red-400';
      textColorClass = 'text-white';
      break;
    case 'green':
      backgroundColorClass =
        'bg-green-500 hover:bg-green-600 focus:ring-green-400';
      textColorClass = 'text-white';
      break;
    default:
      backgroundColorClass =
        'bg-[#4495FF] hover:bg-[#3474CC] focus:ring-blue-400';
      textColorClass = 'text-white';
  }

  // 크기에 따른 클래스 이름 결정
  switch (size) {
    case 'small':
      fontSizeClass = 'text-xs';
      paddingClass = 'px-2 py-1';
      break;
    case 'medium':
      fontSizeClass = 'text-sm';
      paddingClass = 'px-4 py-2';
      break;
    case 'large':
      fontSizeClass = 'text-lg';
      paddingClass = 'px-4 py-3';
      break;
    default:
      fontSizeClass = 'text-sm';
      paddingClass = 'px-4 py-2';
  }

  const className = `inline-flex items-center justify-center font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none rounded ${backgroundColorClass} ${textColorClass} ${fontSizeClass} ${paddingClass} ${borderRadiusClass}`;

  return (
    <button className={className} {...rest}>
      {icon && <span className={`mr-1 ${iconClassName}`}>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
