import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { classNames } from "../utils/classNames";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const ViewMenu = () => {
  return (
    <Menu as="div" className="relative">
      <MenuButton
        type="button"
        className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Day view
        <ChevronDownIcon
          className="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(
                  focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm",
                )}
              >
                Day view
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(
                  focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm",
                )}
              >
                Week view
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(
                  focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm",
                )}
              >
                Month view
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(
                  focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm",
                )}
              >
                Year view
              </a>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default ViewMenu;
