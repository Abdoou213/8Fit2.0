import React, { Component } from 'react';
import { View, Image, ImageStyle } from 'react-native';

interface IdleAnimationProps {
  style?: ImageStyle;
}

interface IdleAnimationState {
  frameIndex: number;
}

//White cat spinning idle animation
const spinningIdleWhiteAnimation = [
  require('../Animations/White/SpinningIdle/frame1.png'),
  require('../Animations/White/SpinningIdle/frame2.png'),
  require('../Animations/White/SpinningIdle/frame3.png'),
  require('../Animations/White/SpinningIdle/frame4.png'),
  require('../Animations/White/SpinningIdle/frame5.png'),
  require('../Animations/White/SpinningIdle/frame6.png'),
  require('../Animations/White/SpinningIdle/frame7.png'),
  require('../Animations/White/SpinningIdle/frame8.png'),
  require('../Animations/White/SpinningIdle/frame9.png'),
  require('../Animations/White/SpinningIdle/frame10.png'),
];

const workingOutWhiteAnimation = [
  require('../Animations/White/WorkingOutFrames/workoutFrame1.png'),
  require('../Animations/White/WorkingOutFrames/workoutFrame2.png'),
  require('../Animations/White/WorkingOutFrames/workoutFrame3.png'),
  require('../Animations/White/WorkingOutFrames/workoutFrame4.png'),
  require('../Animations/White/WorkingOutFrames/workoutFrame5.png'),
  require('../Animations/White/WorkingOutFrames/workoutFrame6.png'),
  require('../Animations/White/WorkingOutFrames/workoutFrame7.png'),
  require('../Animations/White/WorkingOutFrames/workoutFrame8.png'),
  require('../Animations/White/WorkingOutFrames/workoutFrame9.png'),
  require('../Animations/White/WorkingOutFrames/workoutFrame10.png'),
];

class FrameAnimationIdle extends Component<IdleAnimationProps, IdleAnimationState> {
  animationInterval: NodeJS.Timeout | null = null;

  constructor(props: IdleAnimationProps) {
    super(props);
    this.state = {
      frameIndex: 0,
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    this.animationInterval = setInterval(() => {
      this.setState((prevState) => ({
        frameIndex: (prevState.frameIndex + 1) % workingOutWhiteAnimation.length,
      }));
    }, 100);
  }

  componentWillUnmount() {
    if (this.animationInterval !== null) {
      clearInterval(this.animationInterval as any);
    }
  }

  render() {
    const { frameIndex } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={workingOutWhiteAnimation[frameIndex]} style={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center'}} />
      </View>
    );
  }
}

export default FrameAnimationIdle;







