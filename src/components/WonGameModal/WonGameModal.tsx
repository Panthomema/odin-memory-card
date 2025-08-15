import pokeballIcon from '@/assets/icons/pokeball.svg';
import Modal from '@/components/Modal/Modal';
import type { ModalAction } from '@/types/ui';

type WonGameModalProps = {
  actions: [ModalAction, ModalAction];
  viewedPokemon: number;
};

function WonGameModal({ actions, viewedPokemon }: WonGameModalProps) {
  return (
    <Modal
      title="CONGRATULATIONS!"
      icon={{ src: pokeballIcon, name: 'Pokéball' }}
      actions={actions}
    >
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
