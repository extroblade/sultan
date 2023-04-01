import React, {FC} from 'react';

interface iModal {
  show: boolean,
  onHide: () => void,
}

const BurgerModal: FC<iModal> = ({show, onHide}) => {
  return (
    <div>

    </div>
  );
};

export default BurgerModal;
