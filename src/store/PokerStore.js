class PokerStore {
  pokers = [];
  constructor() {
    for (let i = 0; i < 54; i++) {
      this.pokers.push(i);
    }
  }
  getPokers = () => {
    return this.pokers;
  };
}

export default PokerStore;
