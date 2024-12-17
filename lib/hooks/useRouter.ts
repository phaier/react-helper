import { useState, useEffect, useRef } from 'react';

export interface RouterState {
  fragment: string;
  query: string;
  title: string;
}

export namespace RouterState {
  export function get(): RouterState {
    return {
      fragment: window.location.hash,
      query: window.location.search,
      title: document.title,
    };
  }
}

export function useRouter(): [RouterState, (state: Partial<RouterState>) => void] {
  const [router, setState] = useState<RouterState>(() => RouterState.get());

  const setRouter = useRef<(state: Partial<RouterState>) => void>((state: Partial<RouterState>) => {
    const title = state.title === undefined ? document.title : state.title;
    const fragment = state.fragment === undefined ? window.location.hash : state.fragment;
    const query = state.query === undefined ? window.location.search : state.query;

    window.history.pushState({}, title, query + fragment);

    setState({
      title,
      fragment,
      query,
    });
  });

  useEffect(() => {
    console.log('mount');

    const onPopstate = (e: PopStateEvent) => {
      console.log('useRouter', e);

      setState({
        fragment: window.location.hash,
        query: window.location.search,
        title: document.title,
      });
    };

    window.addEventListener('popstate', onPopstate);

    return () => {
      console.log('unmount');
      window.removeEventListener('popstate', onPopstate);
    };
  }, []);

  return [router, setRouter.current];
}
