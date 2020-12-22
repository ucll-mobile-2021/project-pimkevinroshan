
// IGNORE FOR NOW IT IS NOT BEING USED

import React from 'react';
import { View, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const leftActions = () => {
    return (
        <View>
            <Text>Add to cart</Text>
        </View>
    )
}


const SwipeItem = () => (
    <Swipeable
        renderRightActions={leftActions}
    >
        <View>
            <Text>Delete From Cart</Text>
        </View>
    </Swipeable>
    
)
  
export default SwipeItem;


/*<Swipeable
                renderLeftActions={swipeAction.leftActions()}
              ></Swipeable>*/