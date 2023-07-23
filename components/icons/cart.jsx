import ShoppingBagIcon from './shopping-bag';

export default function CartIcon({ className, quantity }) {
  return (
    <div className="relative">
      <ShoppingBagIcon
        className={
          `h-6 transition-all ease-in-out hover:scale-110 hover:text-gray-500 dark:hover:text-gray-300 ${className?className:''}`
        }
      />
      {quantity ? (
        <div className="absolute bottom-0 left-0 -mb-3 -ml-3 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-black text-xs text-white dark:border-black dark:bg-white dark:text-black">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}