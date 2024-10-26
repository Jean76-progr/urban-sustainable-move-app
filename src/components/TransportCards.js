import React, { useState } from 'react';
import { Car, Bike, Calendar } from 'lucide-react';
import Modal from './common/Modal';
import { CarpoolForm, CyclingGroupForm, CarFreeForm } from './forms/ServiceForms';

const TransportCards = () => {
    const [activeModal, setActiveModal] = useState(null);

    const cards = [
        {
            id: 'carpool',
            icon: Car,
            title: "Covoiturage Vert",
            description: "Trouvez ou proposez un trajet écologique",
            action: "Proposer un trajet",
            form: <CarpoolForm />
        },
        {
            id: 'cycling',
            icon: Bike,
            title: "Groupe Cycliste",
            description: "Rejoignez d'autres cyclistes",
            action: "Créer un groupe",
            form: <CyclingGroupForm />
        },
        {
            id: 'carfree',
            icon: Calendar,
            title: "Jour Sans Voiture",
            description: "Participez à notre initiative",
            action: "Je participe",
            form: <CarFreeForm />
        }
    ];

    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                    >
                        <div className="flex items-center p-4">
                            <div className="flex-shrink-0">
                                <card.icon className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="ml-4 flex-grow">
                                <h3 className="font-semibold text-gray-900">{card.title}</h3>
                                <p className="text-sm text-gray-500">{card.description}</p>
                            </div>
                            <button
                                onClick={() => setActiveModal(card.id)}
                                className="ml-4 flex-shrink-0 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                                {card.action}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {cards.map((card) => (
                <Modal
                    key={card.id}
                    isOpen={activeModal === card.id}
                    onClose={() => setActiveModal(null)}
                    title={card.title}
                >
                    {card.form}
                </Modal>
            ))}
        </>
    );
};

export default TransportCards;