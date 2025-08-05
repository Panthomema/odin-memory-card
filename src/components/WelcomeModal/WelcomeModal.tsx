import Modal from '@/components/Modal/Modal';
import type { ModalAction } from '@/types/ui';

type WelcomeModalProps = {
  actions: [ModalAction, ModalAction];
};

function WelcomeModal({ actions }: WelcomeModalProps) {
  return (
    <Modal title="WELCOME!" imgName="pokeball" actions={actions}>
      <p>
        <b>The ghost</b> has escaped from the Pokémon Tower, with some other
        pokémons' spirits.
      </p>
      <p>
        Your mission is to <b>capture</b> it by clicking on it <b>2 times</b>!
      </p>
      <p>
        You only have one pokéball, so if you try to <b>capture</b>
        anything that <b>isn't</b> the ghost, it will <b>haunt</b> you!
      </p>
    </Modal>
  );
}

export default WelcomeModal;
