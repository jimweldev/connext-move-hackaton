import React from 'react';
import { FaCar, FaCircle } from 'react-icons/fa6';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const DriversHomePage = () => {
  return (
    <div className="flex min-h-screen w-full justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* DRIVER HEADER */}
        <Card className="border-none bg-orange-500 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-orange-500">
                JS
              </div>
              <div>
                <p className="text-xl font-semibold">Juan Santos</p>
                <p className="flex items-center gap-1 text-sm opacity-90">
                  {' '}
                  <span className="text-green-500">
                    <FaCircle />
                  </span>{' '}
                  On Duty
                </p>
                <p className="flex items-center gap-1 text-sm opacity-90">
                  <span>
                    <FaCar />
                  </span>
                  Toyota Innova - ABC 1234
                </p>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* TRIP SUMMARY */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <Card>
            <CardBody className="p-3">
              <p className="text-xl font-bold">4</p>
              <p className="text-sm text-gray-500">Total Trips</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-3">
              <p className="text-xl font-bold">2</p>
              <p className="text-sm text-gray-500">Completed</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-3">
              <p className="text-xl font-bold">1</p>
              <p className="text-sm text-gray-500">In Progress</p>
            </CardBody>
          </Card>
        </div>

        {/* CURRENT TRIP */}
        <Card className="border border-blue-500">
          <CardHeader>
            <CardTitle>Current Trip</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                SC
              </div>
              <div>
                <div className="space-between flex items-center gap-2">
                  <div>
                    <p className="font-bold">Sarah Chen</p>
                  </div>
                  <div>
                    <p>En route</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Engineering</p>
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <p className="font-semibold">Pickup</p>
              <p>
                NAIA Terminal 3 — <span className="text-gray-600">2:30 PM</span>
              </p>

              <p className="mt-2 font-semibold">Dropoff</p>
              <p>
                Connext Clark Office —{' '}
                <span className="text-gray-600">~4:00 PM</span>
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="flex-1" variant="secondary">
                Call Passenger
              </Button>
              <Button className="flex-1">Navigate</Button>
            </div>

            {/* ARRIVED DIALOG */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-2 w-full bg-orange-500 text-white hover:bg-orange-600">
                  Mark as Arrived
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter Odometer Reading</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 p-2 py-4">
                  <input
                    type="number"
                    placeholder="Odometer (km)"
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <div className="space-y-4 p-2 py-4">
                  <input
                    type="number"
                    placeholder="Number of Passengers"
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <div className="space-y-4 p-2 py-4">
                  <input
                    type="string"
                    placeholder="End Location"
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <div className="space-y-4 p-2 py-4">
                  <label className="text-sm font-semibold">Arrival Date</label>
                  <input type="date" className="w-full rounded-md border p-2" />
                  <label className="text-sm font-semibold">Arrival Time</label>
                  <input type="time" className="w-full rounded-md border p-2" />
                </div>
                <div className="flex justify-end gap-2 p-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>

                  <Button
                    className="bg-orange-500 text-white hover:bg-orange-600"
                    onClick={() => {
                      toast('Arrival confirmed!');
                    }}
                  >
                    Confirm Arrival
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {/* END ARRIVED DIALOG */}
          </CardBody>
        </Card>

        {/* UPCOMING */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Today</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-semibold text-white">
                MJ
              </div>
              <div className="flex-1">
                <p className="font-bold">Michael Johnson</p>
                <p className="text-sm text-gray-600">Guest — Acme Corp</p>
                <p className="text-xs text-gray-500">
                  Marriott Clark → NAIA Terminal 3
                </p>
              </div>
              <p className="text-sm font-semibold">4:30 PM</p>
            </div>

            {/* START TRIP DIALOG */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-3 w-full" variant="outline">
                  Start Trip
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter Odometer Reading</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 p-2 py-4">
                  <input
                    type="number"
                    placeholder="Odometer (km)"
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div className="space-y-4 p-2 py-4">
                  <input
                    type="number"
                    placeholder="Number of Passengers"
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <div className="space-y-4 p-2 py-4">
                  <input
                    type="string"
                    placeholder="Start Location"
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <div className="space-y-4 p-2 py-4">
                  <label className="text-sm font-semibold">
                    Departure Date
                  </label>
                  <input type="date" className="w-full rounded-md border p-2" />
                  <label className="text-sm font-semibold">
                    Departure Time
                  </label>
                  <input type="time" className="w-full rounded-md border p-2" />
                </div>

                <div className="flex justify-end gap-2 p-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>

                  <Button
                    className="bg-orange-500 text-white hover:bg-orange-600"
                    onClick={() => toast('Trip started!')}
                  >
                    Confirm Start
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {/* END START TRIP DIALOG */}
          </CardBody>
        </Card>

        {/* COMPLETED */}
        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {/* Trip 1 */}
            <div className="flex items-center gap-3 rounded-lg border p-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                RD
              </div>
              <div className="flex-1">
                <p className="font-bold">Robert Dela Cruz</p>
                <p className="text-sm text-gray-600">
                  Connext Clark → SM Clark
                </p>
                <p className="text-xs text-gray-500">Completed at 1:45 PM</p>
              </div>
              <p className="font-bold text-green-600">✔</p>
            </div>

            {/* Trip 2 */}
            <div className="flex items-center gap-3 rounded-lg border p-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                AL
              </div>
              <div className="flex-1">
                <p className="font-bold">Ana Lopez</p>
                <p className="text-sm text-gray-600">NAIA T1 → Connext Clark</p>
                <p className="text-xs text-gray-500">Completed at 10:30 AM</p>
              </div>
              <p className="font-bold text-green-600">✔</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DriversHomePage;
