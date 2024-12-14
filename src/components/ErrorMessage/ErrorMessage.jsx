export default function ErrorMessage({ children }) {
  return <div>{children || "Whoops! Something went wrong..."}</div>;
}
