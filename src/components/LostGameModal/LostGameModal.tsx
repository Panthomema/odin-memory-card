import GhostIcon from '@/assets/icons/ghost.svg?react';
import Modal from '@/components/Modal/Modal';
import type { ModalAction } from '@/types/ui';

type LostGameModalProps = {
  actions: [ModalAction, ModalAction];
  viewedPokemon: number;
};

function LostGameModal({ actions, viewedPokemon }: LostGameModalProps) {
  return (
    <Modal title="GAME OVER!" Icon={GhostIcon} actions={actions}>
      <p>
        The ghost has <b>escaped</b> once again, leaving you <b>haunted</b> in
        the darkness of the Pokémon Tower...
      </p>
      <p>
        You managed to encounter <b>{viewedPokemon}</b> different <b>Pokémon</b>{' '}
        before your fate was sealed.
      </p>
      <p>
        Dare to try again, trainer? The spirits are still <b>waiting</b>...
      </p>
    </Modal>
  );
}

export default LostGameModal;
