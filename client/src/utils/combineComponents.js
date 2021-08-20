// function to combine multiple contexts into one. adapted from:
// https://medium.com/nerd-for-tech/how-to-combine-context-providers-for-cleaner-react-code-9ed24f20225e

const combineComponents = (...components) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};

export default combineComponents;
