import professorOakIcon from '@/assets/icons/professor-oak.svg';
import Modal from '@/components/Modal/Modal';
import type { ModalAction } from '@/types/ui';

type WelcomeModalProps = {
  actions: [ModalAction, ModalAction];
};

function WelcomeModal({ actions }: WelcomeModalProps) {
  return (
    <Modal
      title="WELCOME!"
      icon={{ src: professorOakIcon, name: 'Professor Oak' }}
      actions={actions}
    >
      <p>
        <b>The ghost</b> has escaped from the Pokémon Tower, with some other
        pokémons' spirits.
      </p>
      <p>
        Help Prof. Oak <b>capturing</b> it by clicking on it <b>2 times</b>!
      </p>
      <p>
        You only have one pokéball, so if you try to <b>capture</b> anything
        that <b>isn't</b> the ghost, it will <b>haunt</b> you!
      </p>
    </Modal>
  );
}

export default WelcomeModal;
