import React, { Component } from 'react'
import { Animated, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Dots from 'components/dots'
import OriginButton from 'components/origin-button'

const BUTTON_SIZE = 40
const MARGIN_RIGHT = 10
const MARGIN_LEFT = 10

const TextButton = ({ onPress, textStyle, style, children }) => (
  <View style={{ backgroundColor: '#1a82ff', borderRadius: 30, flex: 1, padding: 13, marginHorizontal: 40, ...style }}>
    <TouchableOpacity
      style={{ flex: 1 }}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 24, ...textStyle }}>{children}</Text>
    </TouchableOpacity>
  </View>
)

const OnboardingPagination = ({
  currentPage,
  controlStatusBar,
  pagesCount,
  onCompletion,
  onNext,
}) => {
  const isLastPage = currentPage + 1 === pagesCount

  return (
    <View
      style={styles.container}
    >
      <Dots
        currentPage={currentPage}
        pagesCount={pagesCount}
        style={styles.dots}
      />
      <View style={styles.buttonContainer}>
        {!isLastPage &&
          <OriginButton
            size="large"
            type="primary"
            title="Next"
            textStyle={{ fontSize: 18 }}
            onPress={onNext}
          />
        }
        {isLastPage &&
          <OriginButton
            size="large"
            type="primary"
            title="Get Started"
            textStyle={{ fontSize: 18 }}
            onPress={onCompletion}
          />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
})

export default OnboardingPagination
