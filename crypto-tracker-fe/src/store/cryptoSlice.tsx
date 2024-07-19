// store/cryptoSlice.ts
"use client"
import { createSlice, createAsyncThunk, PayloadAction  } from '@reduxjs/toolkit';
import axios from 'axios';

export const BE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCryptoData = createAsyncThunk('crypto/fetchCryptoData', async (crypto_id: string) => {
  const response = await axios.get(`${BE_URL}/v1/crypto/${crypto_id}`);
  return response.data.content;
});
export const fetchCryptoCurrencies = createAsyncThunk('crypto/fetchCryptoCurrencies', async () => {
  const response = await axios.get(`${BE_URL}/v1/crypto/`);
  return response.data.content;
});

interface CryptoState {
  data: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  dropdown_status: 'idle' | 'loading' | 'succeeded' | 'failed';
  cryptoOptions: { label: string, value: string }[];
  tempSelectedOption:  { label: string, value: string } | null;
  selectedOption:  { label: string, value: string } | null;
  cryptoDetail: { name: string, symbol: string, _id: string, rank: number} | null
  cryptoCurrencies: any[],
  isModalVisible: boolean
}

let initialState: CryptoState = {
  data: [],
  dropdown_status: 'idle',
  status: 'idle',
  cryptoOptions: [],
  tempSelectedOption: null,
  selectedOption: null,
  cryptoDetail: null,
  cryptoCurrencies: [],
  isModalVisible : false
}

// creating slice for ech actions
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptoData: (state, action: PayloadAction<any[]>) => {
        state.data = action.payload as any;
    },
    setSelectedOption: (state, action: PayloadAction< { label: string, value: string }>) => {
        state.selectedOption = action.payload;
    },
    setTempSelectedOption: (state, action: PayloadAction< { label: string, value: string }>) => {
      console.log("label validateHeaderValue", action.payload)
        state.tempSelectedOption = action.payload;
    },
    setIsModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isModalVisible = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.dropdown_status = 'loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.dropdown_status = 'succeeded';
        console.log(action, action.payload);
        const { data, ...rest} = action.payload;
        state.data = data;
        state.cryptoDetail = rest;
      })
      .addCase(fetchCryptoData.rejected, (state) => {
        state.dropdown_status = 'failed';
      })
      .addCase(fetchCryptoCurrencies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptoCurrencies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("action payload of", action.payload);
        const cryptoOptions = action.payload?.map((currency: any) =>  {
          return {
            label: currency.name,
            value: currency._id
          }
        })
        state.cryptoOptions = cryptoOptions;
        if(cryptoOptions?.length > 0){
          console.log("SELECTED OPTION added ===>", cryptoOptions)
          if(state.tempSelectedOption){
            state.selectedOption = state.tempSelectedOption;  
          }else{
            state.selectedOption = cryptoOptions[0];
          }
        }
      })
      .addCase(fetchCryptoCurrencies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
export const { setCryptoData, setSelectedOption, setIsModalVisible, setTempSelectedOption  } = cryptoSlice.actions;
export default cryptoSlice.reducer;
