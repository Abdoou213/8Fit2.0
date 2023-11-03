import React, { Component } from 'react';
import { View, Image, ImageStyle } from 'react-native';

interface AnimationProps {
  style?: ImageStyle;
  frameRateMs: number,
  animationType: string
}

interface AnimationState {
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

const explosionWhiteAnimation = [
  require('../Animations/White/Explosion/levelupFrame1.png'),
  require('../Animations/White/Explosion/levelupFrame2.png'),
  require('../Animations/White/Explosion/levelupFrame3.png'),
  require('../Animations/White/Explosion/levelupFrame4.png'),
  require('../Animations/White/Explosion/levelupFrame5.png'),
  require('../Animations/White/Explosion/levelupFrame6.png'),
  require('../Animations/White/Explosion/levelupFrame7.png'),
  require('../Animations/White/Explosion/levelupFrame8.png'),
];

const punchingWhiteAnimation = [
  require('../Animations/White/LevelingUp/levelupFrame1.png'),
  require('../Animations/White/LevelingUp/levelupFrame2.png'),
  require('../Animations/White/LevelingUp/levelupFrame3.png'),
  require('../Animations/White/LevelingUp/levelupFrame4.png'),
];

const idleWhiteAnimation = [
  require('../Animations/White/Idle/idleFrame1.png'),
  require('../Animations/White/Idle/idleFrame2.png'),
  require('../Animations/White/Idle/idleFrame3.png'),
  require('../Animations/White/Idle/idleFrame2.png'),
];

const explosionEffect = [
  require('../Animations/Effects/Explosion/explosionFrame1.png'),
  require('../Animations/Effects/Explosion/explosionFrame2.png'),
  require('../Animations/Effects/Explosion/explosionFrame3.png'),
  require('../Animations/Effects/Explosion/explosionFrame4.png'),
  require('../Animations/Effects/Explosion/explosionFrame5.png'),
  require('../Animations/Effects/Explosion/explosionFrame6.png'),
  require('../Animations/Effects/Explosion/explosionFrame7.png'),
  require('../Animations/Effects/Explosion/explosionFrame8.png'),
  require('../Animations/Effects/Explosion/explosionFrame9.png'),
  require('../Animations/Effects/Explosion/explosionFrame10.png'),
  require('../Animations/Effects/Explosion/explosionFrame11.png'),
];

class FrameAnimationIdle extends Component<AnimationProps, AnimationState> {
  animationInterval: NodeJS.Timeout | null = null;
  animationFrames: any[] = [];
  
  constructor(props: AnimationProps) {
    super(props);
    this.state = {
      frameIndex: 0
    };

    // Initialize animationFrames based on the animationType
    this.initAnimationFrames();
  }

  componentDidMount() {
    this.startAnimation();
  }

  initAnimationFrames() {
    const animationType = this.props.animationType;

    if (animationType === 'workingOut') {
      this.animationFrames = workingOutWhiteAnimation;
    } else if (animationType === 'explosion') {
      this.animationFrames = explosionWhiteAnimation;
    } else if (animationType === 'spinning') {
      this.animationFrames = spinningIdleWhiteAnimation;
    } else if (animationType === 'punching') {
      this.animationFrames = punchingWhiteAnimation;
    } else if (animationType === 'idle') {
      this.animationFrames = idleWhiteAnimation;
    }else if (animationType === 'explosionEffect') {
      this.animationFrames = explosionEffect;
    }
  }

  startAnimation() {
    this.animationInterval = setInterval(() => {
      this.setState((prevState) => ({
        frameIndex: (prevState.frameIndex + 1) % this.animationFrames.length,
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
        <Image source={this.animationFrames[frameIndex]} style={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center'}} />
      </View>
    );
  }
}

export default FrameAnimationIdle;








