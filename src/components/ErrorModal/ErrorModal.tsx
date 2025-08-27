import PokedexIcon from '@/assets/icons/pokedex.svg?react';
import Modal from '@/components/Modal/Modal';
import SfxContext from '@/contexts/SfxContext';
import type { ModalAction } from '@/types/ui';
import { useContext, useEffect } from 'react';

type ErrorModalProps = {
  actions: [ModalAction, ModalAction];
};

function ErrorModal({ actions }: ErrorModalProps) {
  const { playErrorSfx } = useContext(SfxContext);

  useEffect(() => {
    playErrorSfx();
  }, [playErrorSfx]);

  return (
    <Modal title="ERROR" Icon={PokedexIcon} actions={actions}>
      <p>
        <b>Oh no!</b> The Pokédex connection was lost while tracking the ghost.
      </p>
      <p>Some Pokémon data could not be retrieved from the Tower.</p>
      <p>
        Try <b>again</b> to re-establish the link, or <b>reset</b> the mission.
      </p>
    </Modal>
  );
}

export default ErrorModal;
