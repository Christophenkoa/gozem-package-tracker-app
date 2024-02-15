import Location from './Location';
import { DeliveryStatus } from './DeliveryStatus'

export default interface Delivery {
    _id?: string
    package_id?: string
    pickup_time?: string
    start_time: string
    end_time?: string
    location?: Location
    status: DeliveryStatus
}
