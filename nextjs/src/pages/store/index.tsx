import { NextPage } from 'next';
import { useMutation, useQuery } from '@apollo/client';
import { GET_BACKGROUNDS } from 'graphql/queries';
import { CircleNotch, SpinnerGap } from 'phosphor-react';
import { Background } from 'types/graphql';
import Image from 'next/image';
import _ from 'lodash';
import { useSession } from 'src/contexts';
import { FC, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { PURCHASE_BACKGROUND } from 'graphql/mutations';

const CorfirmPurchaseDialog: FC<{
  isOpen: boolean,
  onClose: any,
  background: Background | undefined,
  onPurchase: any,
  isLoading: any,
}> = ({ isOpen, onClose, background, onPurchase, isLoading }) => {

  const initialFocus = useRef(null);

  return (
    <Dialog as='div' className='fixed z-10 inset-0 overflow-hidden flex justify-center'
            initialFocus={initialFocus}
            open={isOpen}
            onClose={onClose}>

      <div className='h-full max-w-md p-4 flex items-center justify-center'>

        <Dialog.Overlay className='fixed inset-0 backdrop-blur-sm' />

        <div className='relative bg-primary-600 border border-primary-400 rounded overflow-hidden shadow-xl space-y-10'>

          <div className='flex flex-col text-center items-center py-2 px-10 space-y-2'>

            <Dialog.Title as='h3' className='text-lg font-semibold'>
              Confirm Purchase
            </Dialog.Title>

            <Dialog.Description as='p' className='text-sm font-light'>
              Are you sure you want to purchase this background for {background?.price} gems?
            </Dialog.Description>

          </div>

          <div className='bg-primary-500 p-2.5 flex items-center justify-center'>

            {isLoading && (
              <SpinnerGap className='animate-spin' size={24} weight='bold' />
            )}

            {!isLoading && (
              <button className='bg-accent font-medium p-1.5 rounded w-full' onClick={onPurchase}>
                Purchase
              </button>
            )}

          </div>

        </div>

      </div>

    </Dialog>
  );

};

const Store: NextPage = () => {

  const { profile } = useSession();
  const { loading, data } = useQuery(GET_BACKGROUNDS);
  const [purchaseBackground, { loading: isPurchaseLoading }] = useMutation(PURCHASE_BACKGROUND);

  const [isConfirmPurchaseDialogOpen, setConfirmPurchaseDialogOpen] = useState<Background | undefined>(undefined);

  if (loading || !profile) {
    return (
      <div className='h-full px-5 py-2 flex items-center justify-center'>
        <CircleNotch size={24} className='text-accent animate-spin' />
      </div>
    );
  }

  return (
    <>
      <CorfirmPurchaseDialog
        isOpen={isConfirmPurchaseDialogOpen != undefined}
        onClose={() => setConfirmPurchaseDialogOpen(undefined)}
        background={isConfirmPurchaseDialogOpen}
        onPurchase={
          () => purchaseBackground({ variables: { id: isConfirmPurchaseDialogOpen?.id } })
            .then(() => setConfirmPurchaseDialogOpen(undefined))
        }
        isLoading={isPurchaseLoading}
      />

      <div className='px-5 py-20 flex flex-col items-center space-y-10'>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>

          {_.orderBy(data.backgrounds, ['price'], ['desc'])
            .map((background: Background, index: number) => {

              let color;
              switch (background.rarity) {
                case 'COMMON': {
                  color = 'bg-green-500/95';
                  break;
                }
                case 'RARE': {
                  color = 'bg-blue-500/95';
                  break;
                }
                case 'EPIC': {
                  color = 'bg-purple-500/95';
                  break;
                }
                case 'LEGENDARY': {
                  color = 'bg-amber-500/95';
                  break;
                }
              }

              const owned = profile.backgrounds.findIndex(x => x.id == background.id) >= 0;

              return (
                <div className='relative w-[300px] h-[500px] rounded border border-primary-400 group'>

                  <img src={process.env.NEXT_PUBLIC_NESTJS_BASE_URL + '/assets/background/' + background.id + '.jpeg'}
                       className='rounded w-full h-full object-cover' />

                  <div
                    className={`absolute bottom-[50px] group-hover:bottom-[100px] w-[300px] h-[80px] ${color} flex flex-col items-center justify-center transition-all ease-in-out`}>
                    <p className='text-lg font-medium'>{background.name}</p>
                    <p>{background.rarity}</p>
                  </div>

                  <div
                    className={`rounded-b absolute bottom-0 w-[300px] h-[50px] group-hover:h-[100px] bg-primary-500 flex flex-col items-center justify-center space-y-2 px-5 transition-all ease-in-out`}>

                    <div className='flex items-center justify-center space-x-2'>
                      <p className='text-lg font-medium'>{background.price}</p>
                      <div className='flex justify-center items-center'>
                        <Image src='/assets/gem.svg' width={24} height={24} layout='fixed' />
                      </div>
                    </div>

                    {owned && (
                      <button disabled={true}
                              className='hidden group-hover:block w-full py-1.5 bg-blue-500 rounded font-medium text-sm'>
                        Already purchased
                      </button>
                    )}

                    {!owned && profile.gems < background.price && (
                      <button disabled={true}
                              className='cursor-not-allowed hidden group-hover:block w-full py-1.5 bg-red-500 rounded font-medium text-sm'>
                        Insufficient gems
                      </button>
                    )}

                    {!owned && profile.gems >= background.price && (
                      <button onClick={() => setConfirmPurchaseDialogOpen(background)}
                              className='hidden group-hover:block w-full py-1.5 bg-accent rounded font-medium text-sm'>
                        Purchase
                      </button>
                    )}

                  </div>

                </div>
              );

            })}

        </div>

      </div>
    </>
  );
};

export default Store;