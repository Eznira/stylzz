import { useRouter as useAppRouter, usePathname, useParams } from 'next/navigation';

export function useRouter() {
  const router = useAppRouter();
  const pathname = usePathname();
  const params = useParams();

  return {
    pathname: pathname || '/',
    query: params || {},
    push: (url) => {
      if (router) {
        router.push(url);
      }
    },
    back: () => {
      if (router) {
        router.back();
      }
    }
  };
}

