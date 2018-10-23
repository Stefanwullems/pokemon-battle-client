// import * as React from 'react';
// import { connect } from 'react-redux';
// import { YourHpBar } from '../trainerComponents/HpBar';

// export class YourContainer extends React.Component {
//   render() {
//     return (
//       <div className="YourDiv">
//         {' '}
//         {/* basically we split the battle are in half, one div for current player and one for oposing player*/}
//         <div className="YourHpContainer">
//           {' '}
//           {/* opening the HP AND NAME DIV*/}
//           <div className="YourPokemonName">
//             <h2>
//               {currentTrainer.currentPokemon.name} LV{' '}
//               {currentTrainer.currentPokemon.lv}
//             </h2>{' '}
//             {/* will look like CHARIZARD  LV 4 */}
//           </div>
//           <div className="YourHpBar">
//             <YourHpBar />
//           </div>
//           <div className="CurrentAndTotalHp">
//             {currentTrainer.currentPokemon.hp.current}/
//             {currentTrainer.currentPokemon.hp.total}{' '}
//             {/* will look like 120/120 */}
//           </div>
//         </div>{' '}
//         {/* Closing the HP AND NAME DIV*/}
//         <div className="YourImage">
//           <img src={currentTrainer.currentPokemon.frontImage} />
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ currentTrainer }) => ({ currentTrainer });

// export default connect(mapStateToProps)(YourContainer);
