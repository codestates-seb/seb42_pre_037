import Button from './Button';

function IconButton({ icon, children, ...rest }) {
  return (
    <Button className="inline-flex items-center space-x-2" {...rest}>
      {icon}
      <span>{children}</span>
    </Button>
  );
}

export default IconButton;
