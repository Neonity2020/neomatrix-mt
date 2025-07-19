import * as React from "react";
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  Card,
  List,
  Avatar,
  Menu,
  Tooltip,
  Accordion,
} from "@material-tailwind/react";
import {
  Archive,
  HeadsetHelp,
  LogOut,
  Menu as MenuIcon,
  MultiplePages,
  NavArrowDown,
  ProfileCircle,
  Rocket,
  SelectFace3d,
  Settings,
  UserCircle,
  Xmark,
  SunLight,
  HalfMoon,
  Github,
} from "iconoir-react";

const LINKS = [
  {
    icon: ProfileCircle,
    title: "Account",
    href: "#",
  },
  {
    icon: SelectFace3d,
    title: "Blocks",
    href: "#",
  },
  {
    icon: Archive,
    title: "Docs",
    href: "#",
  },
  {
    icon: Github,
    title: "Github",
    href: "https://github.com/neonity2020",
    target: "_blank",
  },
];

function NavList() {
  return (
    <>
      {LINKS.map(({ icon: Icon, title, href, target }) => (
        <List.Item key={title} as="a" href={href} target={target}>
          <List.ItemStart className="mr-1.5">
            <Icon className="h-4 w-4" />
          </List.ItemStart>
          <Typography type="small">{title}</Typography>
        </List.Item>
      ))}
    </>
  );
}

function ProfileMenu() {
  return (
    <Menu>
      <Menu.Trigger
        as={Avatar}
        src="/images/avatar.webp"
        alt="profile-picture"
        size="sm"
        className="border border-primary p-0.5 lg:ml-auto"
      />
      <Menu.Content className="z-50">
        <Menu.Item>
          <UserCircle className="mr-2 h-[18px] w-[18px]" /> My Profile
        </Menu.Item>
        <Menu.Item>
          <Settings className="mr-2 h-[18px] w-[18px]" /> Edit Profile
        </Menu.Item>
        <Menu.Item>
          <HeadsetHelp className="mr-2 h-[18px] w-[18px]" /> Support
        </Menu.Item>
        <hr className="!my-1 -mx-1 border-surface" />
        <Menu.Item className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error">
          <LogOut className="mr-2 h-[18px] w-[18px]" />
          Logout
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

function ThemeToggleButton() {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <IconButton
      size="sm"
      variant="ghost"
      color="secondary"
      aria-label="切换主题"
      className="ml-2"
      onClick={() => setIsDark((v) => !v)}
    >
      {isDark ? <SunLight className="h-5 w-5" /> : <HalfMoon className="h-5 w-5" />}
    </IconButton>
  );
}

const MenuItem = React.forwardRef<any, { title: string; description: string }>(
  ({ title, description, ...rest }, ref) => {
    return (
      <Menu.Item ref={ref} {...rest} className="flex-col items-start">
        <Typography color="default" className="font-semibold">
          {title}
        </Typography>
        <Typography type="small" className="text-foreground">
          {description}
        </Typography>
      </Menu.Item>
    );
  }
);

export default function ComplexNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
    <Navbar className="mx-auto w-full max-w-screen-xl dark:bg-gray-950 dark:text-gray-100">
      <div className="flex items-center">
        <Typography
          as="a"
          href="/"
          type="small"
          className="ml-2 mr-2 block py-1 font-semibold dark:text-primary-300"
        >
          NeoMatrix
        </Typography>
        <hr className="mx-1 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block dark:border-gray-700" />
        <div className="hidden lg:block">
          <List className="mt-4 flex flex-col gap-1 lg:mt-0 lg:flex-row lg:items-center dark:text-gray-100">
            <Tooltip placement="bottom" interactive>
              <Tooltip.Trigger>
                <List.Item className="dark:text-gray-100">
                  <List.ItemStart className="me-1.5">
                    <MultiplePages className="h-4 w-4" />
                  </List.ItemStart>
                  <Typography type="small" className="dark:text-gray-100">Pages</Typography>
                  <List.ItemEnd className="ps-0.5">
                    <NavArrowDown className="h-3.5 w-3.5 group-data-[open=true]:rotate-180" />
                  </List.ItemEnd>
                </List.Item>
              </Tooltip.Trigger>
              <Tooltip.Content className="grid max-w-lg grid-cols-5 gap-1 rounded-lg border border-surface bg-background p-1 shadow-xl shadow-surface/5 dark:border-gray-700 dark:bg-gray-900 z-50">
                <Card
                  as="a"
                  href="/landing"
                  color="primary"
                  className="col-span-2 grid place-items-center rounded-[5px] px-8 py-4 text-primary-foreground shadow-none dark:bg-gray-800 dark:text-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <div>
                    <Rocket className="mx-auto h-12 w-12" />
                    <Typography
                      type="h6"
                      className="mt-5 text-center leading-snug dark:text-gray-100"
                    >
                      NeoMatrix
                    </Typography>
                  </div>
                </Card>
                <ul className="col-span-3 !m-0">
                  <MenuItem
                    title="@neomatrix/note-taking & writing"
                    description="Find your own note-taking system and writing style with @neomatrix/note-taking & writing"
                  />
                  <MenuItem
                    title="@neomatrix/ai & vibe coding"
                    description="Find your own vibe coding style with @neomatrix/ai & vibe coding"
                  />
                  <MenuItem
                    title="neomatrix/design"
                    description="Find your own design style with @neomatrix/design"
                  />
                </ul>
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip>
            <NavList />
          </List>
        </div>
        <ThemeToggleButton />
        <IconButton
          size="sm"
          variant="ghost"
          color="secondary"
          onClick={() => setOpenNav(!openNav)}
          className="ml-auto mr-2 grid lg:hidden"
        >
          {openNav ? (
            <Xmark className="h-4 w-4" />
          ) : (
            <MenuIcon className="h-4 w-4" />
          )}
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={openNav}>
        <Accordion>
          <Accordion.Item value="react" className="mt-2 border-none">
            <Accordion.Trigger className="p-0">
              <List.Item className="w-full">
                <List.ItemStart className="me-1.5">
                  <MultiplePages className="h-4 w-4" />
                </List.ItemStart>
                <Typography type="small">Pages</Typography>
                <List.ItemEnd className="ps-1">
                  <NavArrowDown className="h-3.5 w-3.5 group-data-[open=true]:rotate-180" />
                </List.ItemEnd>
              </List.Item>
            </Accordion.Trigger>
            <Accordion.Content>
              <MenuItem
                title="@neomatrix/note-taking & writing"
                description="Find your own note-taking system and writing style with @neomatrix/note-taking & writing"
              />
              <MenuItem
                title="@neomatrix/ai & vibe coding"
                description="Find your own vibe coding style with @neomatrix/ai & vibe coding"
              />
              <MenuItem
                title="neomatrix/design"
                description="Find your own design style with @neomatrix/design"
              />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
