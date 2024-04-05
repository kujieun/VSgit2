import React, { useState } from 'react'
import { Button, Alert } from 'react-native'
import { PaymentWidgetProvider, usePaymentWidget, AgreementWidget, PaymentMethodWidget } from '@tosspayments/widget-sdk-react-native'
import type { AgreementWidgetControl, PaymentMethodWidgetControl, AgreementStatus } from '@tosspayments/widget-sdk-react-native'
import { ScrollView } from 'react-native'

// ...
export default function App() {
  return (
    <>
      <ScrollView>
        <PaymentWidgetProvider 
           
           //클라이언트 키와 고객ID
            clientKey={`test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm`} customerKey={`5HocEXk7TFNrcyyf9BFg5`}> 
            <CheckoutPage />
        </PaymentWidgetProvider>
      </ScrollView>
    </>
  )
}

function CheckoutPage() {
  const paymentWidgetControl = usePaymentWidget()
  const [paymentMethodWidgetControl, setPaymentMethodWidgetControl] = useState<PaymentMethodWidgetControl | null>(null)
  const [agreementWidgetControl, setAgreementWidgetControl] = useState<AgreementWidgetControl | null>(null)

  return (
    <>
      <PaymentMethodWidget
        selector="payment-methods" //결제 UI를 렌더링할 컴포넌트의 식별자
        onLoadEnd={() => {
          paymentWidgetControl
            .renderPaymentMethods(
              'payment-methods',
              { value: 50_000 }, //결제 금액
              {
                variantKey: 'DEFAULT', //멀티 결제 UI를 사용할 때 설정, 렌더링하고 싶은 결제 UI의 키 값
              }
            )
            .then(control => {
              setPaymentMethodWidgetControl(control)
            })
        }}
      />
      <AgreementWidget
        selector="agreement" //이용약관 UI의 렌더링 옵션
        onLoadEnd={() => {
          paymentWidgetControl
            .renderAgreement('agreement', {
              variantKey: 'DEFAULT', //렌더링하고 싶은 이용약관의 키 
            })
            .then(control => {
              setAgreementWidgetControl(control)
            })
        }}
      />
      <Button
        title="결제요청"
        onPress={async () => {
          if (paymentWidgetControl == null || agreementWidgetControl == null) {
            Alert.alert('주문 정보가 초기화되지 않았습니다.')
            return
          }

          //고객의 필수 이용약관에 동의 상태를 나타내는 메서드, 메서드 호출 시 약관 데이터 객체가 돌아옴.
          const agreeement = await agreementWidgetControl.getAgreementStatus()
          if (agreeement.agreedRequiredTerms !== true) {
            Alert.alert('약관에 동의하지 않았습니다.')
            return
          }

          paymentWidgetControl.requestPayment?.({
            orderId: 'ZlvhMAPErzPCPIkq_vKUZ', //주문 구분을 위한 ID
            orderName: '토스 티셔츠 외 2건', //주문명
          })
          .then((result) => {
              if (result?.success) {
                // 결제 성공 비즈니스 로직을 구현 필요
                // result.success에 있는 값을 서버로 전달해서 결제 승인을 호출 필요
              } else if (result?.fail) {
                // 결제 실패 비즈니스 로직을 구현 필요
              }
            })
        }}
      />
      <Button
        title="선택된 결제수단"
        onPress={async () => {
          if (paymentMethodWidgetControl == null) {
            Alert.alert('주문 정보가 초기화되지 않았습니다.')
            return
          }
          //고객이 선택한 결제수단을 전달하는 메서드
          Alert.alert(`선택된 결제수단: ${JSON.stringify(await paymentMethodWidgetControl.getSelectedPaymentMethod())}`)
        }}
      />
      <Button
        title="결제 금액 변경"
        onPress={() => {
          if (paymentMethodWidgetControl == null) {
            Alert.alert('주문 정보가 초기화되지 않았습니다.')
            return
          }
          //변경된 결제 금액을 UI에 업데이트하는 메서드
          paymentMethodWidgetControl.updateAmount(100_000).then(() => {
            Alert.alert('결제 금액이 100000원으로 변경되었습니다.')
          })
        }}
      />
    </>
  )
}
