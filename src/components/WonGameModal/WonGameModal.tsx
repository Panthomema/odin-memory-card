import PokeballIcon from '@/assets/icons/pokeball.svg?react';
import Modal from '@/components/Modal/Modal';
import type { ModalAction } from '@/types/ui';

type WonGameModalProps = {
  actions: [ModalAction, ModalAction];
  viewedPokemon: number;
};

function WonGameModal({ actions, viewedPokemon }: WonGameModalProps) {
  return (
    <Modal title="CONGRATULATIONS!" Icon={PokeballIcon} actions={actions}>
      <p>
        You have sucessfully <b>captured the ghost</b>, bringing peace back to
        the Pokémon Tower.
      </p>
      <p>
        You encountered <b>{viewedPokemon}</b> different <b>Pokémon</b> while
        completing your mission.
      </p>
      <p>Ready for your next challenge?</p>
    </Modal>
  );
}

export default WonGameModal;
