import { Component, OnInit, ViewChild } from "@angular/core";
import { EventGuide, EventGuideTypes } from "../../../../../api/models/guide";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Store, select } from "@ngrx/store";
import { State, getGuideEditSectionLoading, getGuideEditSectionError, getGuideEditSectionSuccess } from "./store/edit-section.reducer";
import { EditSection } from "./store/edit-section.actions";
import { BringFormComponent } from "../bring-form/bring-form.component";
import { TransportationFormComponent } from "../transportation-form/transportation-form.component";
import { HotelFormComponent } from "../hotel-form/hotel-form.component";
import { SchoolFormComponent } from "../school-form/school-form.component";
import { MapFormComponent } from "../map-form/map-form.component";
import { ParkingFormComponent } from "../parking-form/parking-form.component";
import { RestaurantFormComponent } from "../restaurant-form/restaurant-form.component";

export interface EditSectionModal {
    type: EventGuideTypes;
    guide: EventGuide;
}

@Component({
    selector: "edit-section",
    templateUrl: "edit-section.template.html"
})
export class EditSectionComponent extends SimpleModalComponent<EditSectionModal, void> implements EditSectionModal {
    @ViewChild("transportation")
    private transportationForm: TransportationFormComponent;
    @ViewChild("hotel")
    private hotelForm: HotelFormComponent;
    @ViewChild("school")
    private schoolForm: SchoolFormComponent;
    @ViewChild("map")
    private mapForm: MapFormComponent;
    @ViewChild("parking")
    private parkingForm: ParkingFormComponent;
    @ViewChild("restaurant")
    private restaurantForm: RestaurantFormComponent;

    public guide: EventGuide;
    public type: EventGuideTypes;

    loading$ = this.store$.pipe(select(getGuideEditSectionLoading));
    error$ = this.store$.pipe(select(getGuideEditSectionError));
    success$ = this.store$.pipe(select(getGuideEditSectionSuccess));

    constructor(private store$: Store<State>) {
        super();
    }

    public clickSave() {
        switch (this.type) {
            case EventGuideTypes.Hotel:
                if (!this.hotelForm.validate()) {
                    return;
                }
                break;
            case EventGuideTypes.Transport:
                if (!this.transportationForm.validate()) {
                    return;
                }
                break;
            case EventGuideTypes.School:
                if (!this.schoolForm.validate()) {
                    return;
                }
                break;
            case EventGuideTypes.Parking:
                if (!this.parkingForm.validate()) {
                    return;
                }
                break;
            case EventGuideTypes.Restaurants:
                if (!this.restaurantForm.validate()) {
                    return;
                }
                break;
        }

        this.store$.dispatch(new EditSection(this.guide));
        this.close();
    }
}
