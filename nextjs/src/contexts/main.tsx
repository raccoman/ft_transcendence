import { FCWithChildren } from 'types';
import { ChatContextProvider, GameContextProvider } from 'src/contexts';

const combineContexts = (...components: any[]) => {
  return components.reduce((AccumulatedComponents, CurrentComponent) => {
    // eslint-disable-next-line react/display-name
    return ({ children }: any) => {
      return (
        <AccumulatedComponents>
          <CurrentComponent>
            {children}
          </CurrentComponent>
        </AccumulatedComponents>
      );
    };

  }, ({ children }: any) => <>{children}</>);
};

const Contextes = combineContexts(...[
  ChatContextProvider,
  GameContextProvider,
]);

export const AppContextProvider: FCWithChildren = ({ children }) => (
  <Contextes>
    {children}
  </Contextes>
);