/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, Items} from '../database/Database';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

const Cart = ({route, navigation}) => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);

  const getDataFromDB = async () => {
    const ids = JSON.parse(await AsyncStorage.getItem('cartsItems'));
    const productData = [];
    if (ids) {
      Items.forEach(prod => {
        if (ids.includes(prod.id)) {
          productData.push(prod);
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };

  const getTotal = products => {
    let tot = 0;
    products.map(ele => {
      let price = ele.productPrice;
      tot += price;
    });

    setTotal(tot);
  };

  const removeFromCart = id => {
    console.log(id);
  };

  const renderProduct = (data, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            backgroundColor: COLORS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={data.productImage}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLORS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {data ? data.productName : null}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                }}>
                $ {data.productPrice}
              </Text>
              <Text>(~${data.productPrice + data.productPrice / 20})</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 100,
                  borderWidth: 1,
                  marginRight: 20,
                  padding: 4,
                  borderColor: COLORS.backgroundMedium,
                }}>
                <Material
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLORS.backgroundDark,
                  }}
                />
              </View>
              <Text>1</Text>
              <View
                style={{
                  borderRadius: 100,
                  borderWidth: 1,
                  marginLeft: 20,
                  padding: 4,
                }}>
                <Material
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLORS.backgroundDark,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(data.id)}>
              <Material
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLORS.backgroundLight,
                  backgroundColor: COLORS.backgroundLight,
                  borderRadius: 100,
                  padding: 8,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.white,
      }}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Material
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLORS.backgroundLight,
                padding: 12,
                backgroundColor: COLORS.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
            }}>
            Order details
          </Text>
          <View />
        </View>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.black,
            fontWeight: '600',
            letterSpacing: 1,
            marginTop: 20,
            paddingLeft: 16,
          }}>
          My Cart
        </Text>
        <View>{product ? product.map(renderProduct) : null}</View>
      </ScrollView>
    </View>
  );
};

export default Cart;
