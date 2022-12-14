/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, Items} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';

const ProductInfo = ({route, navigation}) => {
  const {productId} = route.params;
  const [product, setProduct] = useState({});
  const screenWidth = Dimensions.get('window').width;
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, screenWidth);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });
    console.log(product);

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].id === productId) {
        setProduct(Items[i]);
        return;
      }
    }
  };

  const renderProduct = ({item, i}) => {
    return (
      <View
        style={{
          width: screenWidth,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={item}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.white,
        position: 'relative',
      }}>
      <StatusBar
        backgroundColor={COLORS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: COLORS.backgroundLight,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              paddingLeft: 16,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLORS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.productImageList ? product.productImageList : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            decelerationRate={0.5}
            snapToInterval={screenWidth}
            bounces={false}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              marginTop: 32,
            }}>
            {product.productimageList
              ? product.productimageList.map((data, i) => {
                  const opacity = position.interpolate({
                    inputRange: [i - 1, i, i + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={i}
                      style={{
                        width: '16%',
                        height: 2.4,
                        backgroundColor: COLORS.black,
                        marginHorizontal: 4,
                        borderRadius: 100,
                        opacity,
                      }}
                    />
                  );
                })
              : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductInfo;
