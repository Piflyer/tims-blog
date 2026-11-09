import { Link } from "@heroui/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { getUser } from '@/utils/auth';
import AvatarWrapper from './AvatarWrapper';
import ThemeSwitcher from './ThemeSwitcher';

export default async function NavbarWrapper() {
  const user = await getUser();

  return (
    <Navbar
      maxWidth="full"
      classNames={{
        base: 'backdrop-blur-sm border-b border-b-secondary',
        // Line up with the 800px body column (800px + 20px padding each side)
        wrapper: 'max-w-[840px] px-5',
      }}
    >
      <NavbarBrand className="gap-5">
        <Link href="https://thisistim.dev" className="text-xl font-bold">
          {process.env.BLOG_TITLE}
        </Link>
        <ThemeSwitcher />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <AvatarWrapper user={user} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
