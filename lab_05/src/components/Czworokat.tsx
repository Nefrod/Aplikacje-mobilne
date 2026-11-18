import React, { useRef, useState } from 'react';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/react';

const Czworokat: React.FC = () => {
  const aRef = useRef<HTMLIonInputElement>(null);
  const bRef = useRef<HTMLIonInputElement>(null);
  const cRef = useRef<HTMLIonInputElement>(null);
  const dRef = useRef<HTMLIonInputElement>(null);
  const alfaRef = useRef<HTMLIonInputElement>(null);
  const gammaRef = useRef<HTMLIonInputElement>(null);

  const [wynik, setWynik] = useState<string>();

  const oblicz = () => {
    const a = Number(aRef.current?.value);
    const b = Number(bRef.current?.value);
    const c = Number(cRef.current?.value);
    const d = Number(dRef.current?.value);

    const alfa = Number(alfaRef.current?.value);
    const gamma = Number(gammaRef.current?.value);

    if (
      !a ||
      !b ||
      !c ||
      !d ||
      !alfa ||
      !gamma ||
      a <= 0 ||
      b <= 0 ||
      c <= 0 ||
      d <= 0 ||
      alfa <= 0 ||
      alfa >= 360 ||
      gamma <= 0 ||
      gamma >= 360
    ) {
      setWynik('Nieprawidłowe dane');
      return;
    }

    const s = (a + b + c + d) / 2;

    const katRad =
      ((alfa + gamma) / 2) *
      Math.PI /
      180;

    const podPierwiastkiem =
      (s - a) *
        (s - b) *
        (s - c) *
        (s - d) -
      a *
        b *
        c *
        d *
        Math.pow(Math.cos(katRad), 2);

    if (podPierwiastkiem <= 0) {
      setWynik('Taki czworokąt nie istnieje');
      return;
    }

    const pole = Math.sqrt(podPierwiastkiem);

    setWynik(`Pole: ${pole.toFixed(2)}`);
  };

  const resetuj = () => {
    if (aRef.current) aRef.current.value = '';
    if (bRef.current) bRef.current.value = '';
    if (cRef.current) cRef.current.value = '';
    if (dRef.current) dRef.current.value = '';
    if (alfaRef.current) alfaRef.current.value = '';
    if (gammaRef.current) gammaRef.current.value = '';

    setWynik(undefined);
  };

  return (
    <IonCard>
      <IonCardContent>
        <h2>Pole czworokąta</h2>

        <IonItem>
          <IonLabel position="stacked">Bok a</IonLabel>
          <IonInput
            ref={aRef}
            type="number"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Bok b</IonLabel>
          <IonInput
            ref={bRef}
            type="number"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Bok c</IonLabel>
          <IonInput
            ref={cRef}
            type="number"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Bok d</IonLabel>
          <IonInput
            ref={dRef}
            type="number"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            Kąt α
          </IonLabel>
          <IonInput
            ref={alfaRef}
            type="number"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            Kąt γ
          </IonLabel>
          <IonInput
            ref={gammaRef}
            type="number"
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={oblicz}
        >
          Oblicz pole
        </IonButton>

        <IonButton
          expand="block"
          color="medium"
          onClick={resetuj}
        >
          Resetuj
        </IonButton>

        {wynik && (
          <h2 className="ion-text-center">
            {wynik}
          </h2>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default Czworokat;