import React, { useState } from 'react';

import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';

const Kalkulator: React.FC = () => {
  const [wyswietlacz, setWyswietlacz] = useState('0');

  const [poprzedniaLiczba, setPoprzedniaLiczba] =
    useState<number | null>(null);

  const [dzialanie, setDzialanie] =
    useState<string | null>(null);

  const [pokazAlert, setPokazAlert] = useState(false);

  const wpiszCyfre = (cyfra: string) => {
    if (wyswietlacz === '0') {
      setWyswietlacz(cyfra);
    } else {
      setWyswietlacz(wyswietlacz + cyfra);
    }
  };

  const wpiszKropke = () => {
    if (!wyswietlacz.includes('.')) {
      setWyswietlacz(wyswietlacz + '.');
    }
  };

  const wybierzDzialanie = (operator: string) => {
    setPoprzedniaLiczba(
      parseFloat(wyswietlacz)
    );

    setDzialanie(operator);

    setWyswietlacz('0');
  };

  const wyczysc = () => {
    setWyswietlacz('0');
    setPoprzedniaLiczba(null);
    setDzialanie(null);
  };

  const oblicz = () => {
    if (
      poprzedniaLiczba === null ||
      dzialanie === null
    ) {
      return;
    }

    const drugaLiczba =
      parseFloat(wyswietlacz);

    let wynik: number;

    switch (dzialanie) {
      case '+':
        wynik =
          poprzedniaLiczba + drugaLiczba;
        break;

      case '-':
        wynik =
          poprzedniaLiczba - drugaLiczba;
        break;

      case '×':
        wynik =
          poprzedniaLiczba * drugaLiczba;
        break;

      case '÷':
        if (drugaLiczba === 0) {
          wyczysc();
          setPokazAlert(true);
          return;
        }

        wynik =
          poprzedniaLiczba / drugaLiczba;
        break;

      default:
        return;
    }

    const zaokraglonyWynik =
      parseFloat(wynik.toFixed(10));

    setWyswietlacz(
      zaokraglonyWynik.toString()
    );

    setPoprzedniaLiczba(null);
    setDzialanie(null);
  };

  return (
    <IonCard>
      <IonCardContent>
        <h1 className="ion-text-right">
          {wyswietlacz}
        </h1>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                onClick={() => wpiszCyfre('7')}
              >
                7
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={() => wpiszCyfre('8')}
              >
                8
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={() => wpiszCyfre('9')}
              >
                9
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={() =>
                  wybierzDzialanie('÷')
                }
              >
                ÷
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                onClick={() => wpiszCyfre('4')}
              >
                4
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={() => wpiszCyfre('5')}
              >
                5
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={() => wpiszCyfre('6')}
              >
                6
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={() =>
                  wybierzDzialanie('×')
                }
              >
                ×
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                onClick={() => wpiszCyfre('1')}
              >
                1
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={() => wpiszCyfre('2')}
              >
                2
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={() => wpiszCyfre('3')}
              >
                3
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={() =>
                  wybierzDzialanie('-')
                }
              >
                −
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                color="medium"
                onClick={wyczysc}
              >
                C
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={() => wpiszCyfre('0')}
              >
                0
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={wpiszKropke}
              >
                .
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                expand="block"
                onClick={() =>
                  wybierzDzialanie('+')
                }
              >
                +
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                onClick={oblicz}
              >
                =
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonAlert
          isOpen={pokazAlert}
          header="Błąd"
          message="Nie można dzielić przez zero"
          buttons={['OK']}
          onDidDismiss={() => setPokazAlert(false)}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default Kalkulator;