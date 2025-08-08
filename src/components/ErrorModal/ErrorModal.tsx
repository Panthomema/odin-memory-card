import Modal from '@/components/Modal/Modal';
import type { ModalAction } from '@/types/ui';

type ErrorModalProps = {
  actions: [ModalAction, ModalAction];
};

function ErrorModal({ actions }: ErrorModalProps) {
  return (
    <Modal title="ERROR" imgName="pokedex" actions={actions}>
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
