import { House } from 'lucide-react';
import Link from 'next/link';

export const GoHome = () => {
  return (
    <div className="bg-gray-300 p-4 absolute top-0 left-0">
      <Link href="/" className="inline-block">
        <House
          size={50}
          color="#000000"
          className="hover:stroke-gray-600 transition duration-150"
        />
      </Link>
    </div>
  );
};

export default GoHome;
