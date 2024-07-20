"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CryptoTable from '../components/CryptoTable';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { BE_URL, fetchCryptoCurrencies, fetchCryptoData, setCryptoData, setIsModalVisible, setSelectedOption, setTempSelectedOption } from '../store/cryptoSlice';
import CryptoDropdown from '@/components/CryptoDropdown';
import socketManager from '../utils/socketManager';
import { Badge, Button, Layout, Modal, Spin } from 'antd';
const { Header, Content } = Layout;
export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { cryptoDetail, status, selectedOption, isModalVisible, tempSelectedOption } = useSelector((state: RootState) => state.crypto);


  // fetching first crypto currencies from the mongodb
  useEffect(() => {
    dispatch(fetchCryptoCurrencies());

    // connecting to the socket from FE
    if(BE_URL){
      socketManager.connect(BE_URL);
    }
    // disconnect the socket when component unmount
    return () => {
      socketManager.disconnect();
    };

  }, []);

  // fetched crypto data based on crypto selection
  useEffect(() => {

    // if option is selected then fetch crypto data
    if(selectedOption){
      dispatch(fetchCryptoData(selectedOption?.value));
    }

    // manage socket and subscribe to the socket event with crypt ids
    const socket = socketManager.getSocket();
    if (socket) {
        if(selectedOption){
          socket.emit('subscribe', selectedOption.value);
        }

        // get crypto data from the cryptoData event from back end
        socket.on('cryptoData', (data) => {
            console.log("CRYPTO DATA RECEIVED! =>", data);
            dispatch(setCryptoData(data));
        });
        
        // unsubscribe when component unmount
        return () => {
          if(selectedOption){
            socket.emit('unsubscribe', selectedOption.value);
          }
          socket.off('cryptoData');
        };
    }
  }, [selectedOption]);

  /**
   * Open the modal 
   */
  const showModal = () => {
    dispatch(setIsModalVisible(true));
  };

  /**
   * this method used to set selected option on modal apply button
   */
  const handleOk = () => {
    if(tempSelectedOption){
      dispatch(setSelectedOption(tempSelectedOption));
    }
    dispatch(setIsModalVisible(false));
  };

  /**
   * Close the modal
   */
  const handleCancel = () => {
    if(selectedOption){
      dispatch(setTempSelectedOption(selectedOption));
    }
    dispatch(setIsModalVisible(false));
  };

  return (
    <div>
      {status == "loading" && <Spin className="spin" />}
      <Layout className={"layout"}>
        <Header className={"header"}>
          
          <div className="crypto">
            <img src={cryptoDetail?.symbol} alt={cryptoDetail?.name} className="symbol" />
            <span className="name">{cryptoDetail?.name}</span>
            <Badge count={`#${cryptoDetail?.rank}`} style={{ backgroundColor: '#52c41a', marginLeft: '10px' }} />
          </div>
          <Button type="primary" onClick={showModal}>
            Select Cryptocurrency
          </Button>
        </Header>
        <Content className={"content"}>
          <CryptoTable />
        </Content>
        <Modal
                title="Select Cryptocurrency"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="apply" type="primary" onClick={handleOk}>
                        Apply
                    </Button>,
                ]}
            >
              <CryptoDropdown />
            </Modal>
      </Layout>
    </div>
  );
}
