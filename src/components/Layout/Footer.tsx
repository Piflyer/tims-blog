export default function Footer() {
  return (
    <footer className="mt-auto flex h-32 flex-col justify-center border-t border-t-secondary text-center">
      <div className="text-sm">
        <a href="https://thisistim.dev">&copy; {new Date().getFullYear()} {process.env.AUTHOR_NAME}. All rights reserved.</a>
      </div>
    </footer>
  );
}
