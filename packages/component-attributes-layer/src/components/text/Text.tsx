import { ComponentProps } from "../../types";
import { useMemo, useCallback } from "react";
import { Label } from "../commons/Label";
import { PropertyContainer } from "../commons/PropertyContainer";
import { TextInput } from "../commons/TextInput";
import { createObject } from "@atrilabs/core";

export const Text: React.FC<ComponentProps> = (props) => {
  const selector = useMemo(() => {
    return props.selector || [];
  }, [props]);
  const propValue = useMemo(() => {
    let currentValue : any= props.attrs;
    for (let prop of selector) {
      currentValue = currentValue[prop] ;
      if (currentValue === undefined) break;
    }
    return currentValue || "";
  }, [props, selector]);

  const callPatchCb = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.patchCb({
        property: {
          attrs: createObject(props.attrs, selector, e.target.value),
        },
      });
    },
    [props, selector]
  );

  return (
    <PropertyContainer>
      <Label name={props.propName} />
      <TextInput value={propValue} onChange={callPatchCb} />
    </PropertyContainer>
  );
};
