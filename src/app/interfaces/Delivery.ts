import Location from './Location';
import { DeliveryStatus } from './DeliveryStatus'

export default interface Delivery {
    _id?: string
    package_id?: String
    pickup_time: Date
    start_time: Date
    end_time: Date
    location: Location
    status: DeliveryStatus
}
