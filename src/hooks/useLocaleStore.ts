import React from "react";

export interface ILocalStore {
  /**
   * Разрушения стора при демонтировании компонента
   */
  destroy(): void;
}

/** Cоздает экземпляр класса, время жизни которого ограничено жизненным циклом компонента. */
export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const container = React.useRef<null | T>(null);
  if (container.current === null) {
    container.current = creator();
  }

  React.useEffect(() => {
    return () => container.current?.destroy();
  }, []);

  return container.current;
};
