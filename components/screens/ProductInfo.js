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
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, Items} from '../database/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  const addToCart = async id => {
    let arr = [];
    let itemArray = JSON.parse(await AsyncStorage.getItem('cartsItems'));
    if (itemArray) {
      arr.push(...itemArray);
    }
    arr.push(id);
    console.log(arr);

    try {
      await AsyncStorage.setItem('cartsItems', JSON.stringify(arr));
      ToastAndroid.show('Item Added', ToastAndroid.SHORT);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
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
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: COLORS.blue,
              }}
            />
            <Text>Shopping</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 4,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                letterSpacing: 0.5,
                marginVertical: 4,
                color: COLORS.black,
                maxWidth: '84%',
              }}>
              {product.productName}
            </Text>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: COLORS.blue,
                backgroundColor: COLORS.blue,
                padding: 8,
                borderRadius: 100,
                width: 40,
                height: 40,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 12,
                color: COLORS.black,
                letterSpacing: 1,
                lineHeight: 20,
                opacity: 0.5,
                maxWidth: '85%',
                maxHeight: 64,
                marginBottom: 18,
              }}>
              {product.description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 14,
                borderBottomColor: COLORS.backgroundLight,
                borderBottomWidth: 2,
                paddingBottom: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                }}>
                <View
                  style={{
                    color: COLORS.blue,
                    backgroundColor: COLORS.backgroundLight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 12,
                    borderRadius: 100,
                    marginRight: 10,
                  }}>
                  <Entypo
                    name="location-pin"
                    style={{
                      fontSize: 12,
                      color: COLORS.blue,
                    }}
                  />
                </View>
                <Text>Av du 30 juin, new Alaska</Text>
              </View>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 22,
                  color: COLORS.backgroundDark,
                }}
              />
            </View>
          </View>
          <View style={{paddingHorizontal: 16, marginBottom: 60}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                maxWidth: '85%',
                color: COLORS.black,
                marginBottom: 4,
              }}>
              $ {product.productPrice}.00
            </Text>
            <Text style={{marginBottom: 30}}>
              Tax rate 2% ~ ${product.productPrice / 20} ($
              {product.productPrice + product.productPrice / 20})
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={{
            backgroundColor: COLORS.blue,
            width: '86%',
            height: '90%',
            padding: 8,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLORS.backgroundLight,
              textAlign: 'center',
              fontWeight: '700',
              letterSpacing: 1,
            }}>
            {product.isAvailable ? 'Add to cart' : 'Not Available'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;
