import Modal from '@/components/Modal/Modal';

function WelcomeModal() {
  return (
    <Modal
      title="WELCOME!"
      imgName="pokeball"
      actions={[
        {
          label: 'PLAY',
          onCommit: () => {
            alert('PLAY');
          },
          index: 0,
        },
        {
          label: 'RESET',
          onCommit: () => {
            alert('RESET');
          },
          index: 1,
        },
      ]}
    >
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
