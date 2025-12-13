import React, { useState } from 'react';
import { MapPin, User, X } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { FaCarSide, FaMessage, FaPhone, FaPlus } from 'react-icons/fa6';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardBody } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PassengerHomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [headCount, setHeadCount] = useState('');

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 11, 10),
    to: new Date(2025, 11, 15),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDrawerOpen(false); // close drawer after submit
  };

  type DropPoint = {
    id: string;
    location: string;
    type: 'pickup' | 'dropoff';
    user: string;
  };

  const [dropPoints, setDropPoints] = useState<DropPoint[]>([
    { id: crypto.randomUUID(), location: '', type: 'pickup', user: 'me' },
  ]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-4">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Hello, Sarah!</h1>
        <p className="text-muted-foreground text-sm">
          Need a ride? We've got you covered.
        </p>
        <Button
          className="mt-3 w-full rounded-xl py-5 text-base font-semibold"
          variant="secondary"
          onClick={() => setIsDrawerOpen(true)}
        >
          <FaPlus /> Request a Ride
        </Button>
      </div>

      {/* Active Trip */}
      <div>
        <h2 className="text-muted-foreground mb-2 text-lg font-bold">
          Your Active Trip
        </h2>
        <Card className="rounded-xl border bg-white shadow-sm">
          <CardBody className="space-y-4 p-4">
            <Badge className="flex w-full animate-pulse items-center gap-2 bg-green-100 py-2 text-green-800">
              <FaCarSide /> Driver is on the way
            </Badge>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="text-primary mt-1 h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-xs">PICKUP</p>
                  <p className="font-semibold">NAIA Terminal 3</p>
                  <p className="text-xs">2:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="text-primary mt-1 h-4 w-4 text-red-500" />
                <div>
                  <p className="text-muted-foreground text-xs">DROPOFF</p>
                  <p className="font-semibold">Connext Clark Office</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl border p-3">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8" />
                <div className="flex-1">
                  <p className="font-semibold">Juan Santos</p>
                  <p className="text-muted-foreground text-xs">
                    Toyota Innova • ABC 1234
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200">
                  <FaPhone className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <FaMessage className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Upcoming Trips */}
      <div>
        <h2 className="text-muted-foreground mb-2 text-lg font-bold">
          Upcoming Trips
        </h2>

        {/* Trip Item */}
        <Card className="mb-3 rounded-xl border bg-white shadow-sm">
          <CardBody className="flex items-start justify-between p-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Badge>15 DEC</Badge>
                <Badge variant="success">Confirmed</Badge>
              </div>
              <p className="font-semibold">Clark Office → NAIA T3</p>
              <p className="text-sm">3:00 PM</p>
              <div className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                <User className="h-4 w-4" /> Maria Cruz
              </div>
            </div>
            <Button variant="link" className="text-primary p-0">
              View Details
            </Button>
          </CardBody>
        </Card>

        {/* Pending Trip */}
        <Card className="mb-3 rounded-xl border bg-white shadow-sm">
          <CardBody className="flex items-start justify-between p-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Badge>18 DEC</Badge>
                <Badge variant="destructive">Pending</Badge>
              </div>
              <p className="font-semibold">Marriott Hotel → Clark Office</p>
              <p className="text-sm">9:00 AM</p>
              <p className="text-muted-foreground mt-1 text-sm">
                ⏳ Awaiting assignment
              </p>
            </div>
            <Button variant="link" className="text-primary p-0">
              View Details
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* Request for Guest */}
      <Card className="flex items-center justify-between rounded-xl border p-4 shadow-sm">
        <div>
          <p className="font-semibold">Expecting a visitor?</p>
          <p className="text-muted-foreground text-sm">
            Request a ride for your guest
          </p>
        </div>
        <Button variant="secondary" className="rounded-lg">
          Request for Guest
        </Button>
      </Card>

      {/* Past Trips */}
      <div>
        <h2 className="text-muted-foreground mb-2 text-lg font-bold">
          Past Trips
        </h2>
        <Card className="rounded-xl border bg-white shadow-sm">
          <CardBody className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Badge>10 DEC</Badge>
                  <Badge variant="success">Completed</Badge>
                </div>
                <p className="font-semibold">NAIA T1 → Clark Office</p>
                <p className="text-muted-foreground text-sm">
                  Completed at 11:30 AM
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle>Request a Ride</DrawerTitle>
          </DrawerHeader>

          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            {/* Scrollable Card */}
            <div className="bg-background max-h-[55vh] space-y-4 overflow-y-auto rounded-xl border p-4 shadow-sm">
              {/* Schedule */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Schedule</Label>
                <div className="flex justify-center">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                    className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                  />
                </div>
              </div>

              {/* Headcount */}
              <div className="space-y-1">
                <Label htmlFor="headcount">Headcount</Label>
                <Input
                  id="headcount"
                  placeholder="Enter headcount"
                  value={headCount}
                  onChange={e => setHeadCount(e.target.value)}
                  required
                />
              </div>

              {/* Locations */}
              <div className="space-y-1">
                <Label htmlFor="pickup">Pickup Location</Label>
                <Input
                  id="pickup"
                  placeholder="Enter pickup location"
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="dropoff">Dropoff Location</Label>
                <Input
                  id="dropoff"
                  placeholder="Enter dropoff location"
                  value={dropoff}
                  onChange={e => setDropoff(e.target.value)}
                  required
                />
              </div>

              {/* Drop Points */}
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">Drop Points</Label>
                  <span className="text-muted-foreground text-xs">
                    {dropPoints.length} stop{dropPoints.length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Drop Point Rows */}
                <div className="space-y-3">
                  {dropPoints.map((point, index) => (
                    <div
                      key={point.id}
                      className="bg-background flex flex-col gap-3 rounded-xl border p-3 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center"
                    >
                      <div className="flex gap-2 sm:flex-row sm:items-center">
                        {/* Index */}
                        <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                          {index + 1}
                        </div>

                        {/* Location */}
                        <Input
                          className="flex-1"
                          placeholder="Enter location"
                          value={point.location}
                          onChange={e => {
                            const updated = [...dropPoints];
                            updated[index].location = e.target.value;
                            setDropPoints(updated);
                          }}
                          required
                        />
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2">
                        {/* Pickup / Dropoff */}
                        <Select
                          value={point.type}
                          onValueChange={(value: 'pickup' | 'dropoff') => {
                            const updated = [...dropPoints];
                            updated[index].type = value;
                            setDropPoints(updated);
                          }}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pickup">Pickup</SelectItem>
                            <SelectItem value="dropoff">Dropoff</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* User */}
                        <Select
                          value={point.user}
                          onValueChange={value => {
                            const updated = [...dropPoints];
                            updated[index].user = value;
                            setDropPoints(updated);
                          }}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="me">Me</SelectItem>
                            <SelectItem value="guest">Guest</SelectItem>
                            <SelectItem value="employee">Employee</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Remove */}
                        {dropPoints.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() =>
                              setDropPoints(
                                dropPoints.filter((_, i) => i !== index),
                              )
                            }
                          >
                            <X className="text-destructive h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl border-dashed py-5 text-sm font-medium"
                  onClick={() =>
                    setDropPoints([
                      ...dropPoints,
                      {
                        id: crypto.randomUUID(),
                        location: '',
                        type: 'dropoff',
                        user: 'me',
                      },
                    ])
                  }
                >
                  + Add Drop Point
                </Button>
              </div>
            </div>

            {/* Submit (Always visible) */}
            <Button
              type="submit"
              className="w-full rounded-xl py-6 text-base font-semibold"
            >
              Submit Request
            </Button>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
