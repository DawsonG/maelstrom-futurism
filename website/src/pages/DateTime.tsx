import { ReactNode } from "react";
import { DateInput, RangeGroup } from "@maelstrom-futurism/form";
import { Container } from "@maelstrom-futurism/layout";

import CodeView from "../components/CodeView";

const DateTime = (): ReactNode => (
    <Container>
        <h1>DateTime</h1>

        <p>
            <code>DateInput</code> wraps native <code>type="date"</code>/<code>type="time"</code>
            inputs with consistent cross-browser styling using the same visual tokens as{" "}
            <code>Input</code>.
        </p>

        <CodeView>{`<DateInput type="date" name="ourDate" />
<DateInput type="time" name="ourTime" />`}</CodeView>

        <DateInput type="date" name="ourDate" />
        <DateInput type="time" name="ourTime" />

        <h2>No-past Dates</h2>
        <p>
            Pass <code>minDate="today"</code> to prevent selecting a date before today, or pass
            an ISO date string (<code>YYYY-MM-DD</code>) for a custom lower bound. This sets the
            native <code>min</code> attribute and clears any value that violates it.
        </p>

        <CodeView>{`<DateInput type="date" name="no-past" label="No past dates" minDate="today" />`}</CodeView>

        <DateInput type="date" name="no-past" label="No past dates" minDate="today" />

        <h2>No-future Dates</h2>
        <p>
            Pass <code>maxDate="today"</code> to prevent selecting a date after today, or pass an
            ISO date string for a custom upper bound. This sets the native <code>max</code>{" "}
            attribute and clears any value that violates it.
        </p>

        <CodeView>{`<DateInput type="date" name="no-future" label="No future dates" maxDate="today" />`}</CodeView>

        <DateInput type="date" name="no-future" label="No future dates" maxDate="today" />

        <h2>Disable Specific Days</h2>
        <p>
            Pass <code>disabledDays</code> with any mix of <code>"weekends"</code>, day names
            (e.g. <code>"Monday"</code>), or ISO dates. A selection matching any rule is rejected
            and the field is cleared.
        </p>

        <CodeView>{`<DateInput type="date" name="no-weekends" label="Weekdays only"
    disabledDays={["weekends"]} />

<DateInput type="date" name="no-mondays" label="No Mondays or holidays"
    disabledDays={["Monday", "2026-12-25"]} />`}</CodeView>

        <DateInput type="date" name="no-weekends" label="Weekdays only" disabledDays={["weekends"]} />
        <DateInput type="date" name="no-mondays" label="No Mondays or holidays" disabledDays={["Monday", "2026-12-25"]} />

        <h2>Business Hours Snapping</h2>
        <p>
            Pass <code>businessHours</code> (<code>{"{ start, end }"}</code>, as{" "}
            <code>HH:mm</code> strings) to a <code>type="time"</code> field. On blur, a value
            outside that range snaps to the nearest boundary.
        </p>

        <CodeView>{`<DateInput type="time" name="appointment" label="Appointment time (9am–5pm)"
    businessHours={{ start: "09:00", end: "17:00" }} />`}</CodeView>

        <DateInput type="time" name="appointment" label="Appointment time (9am–5pm)"
            businessHours={{ start: "09:00", end: "17:00" }} />

        <h2>Date Range Pairing</h2>
        <p>
            Wrap a pair of <code>DateInput</code>s in <code>RangeGroup</code> and set{" "}
            <code>rangeGroup="start"</code>/<code>rangeGroup="end"</code>. The end field's{" "}
            <code>min</code> automatically follows the start field's value, and an already-chosen
            end date is cleared if it falls before a newly-selected start date.
        </p>

        <CodeView>{`import { DateInput, RangeGroup } from "@maelstrom-futurism/form";

const FormControl = () => (
    <RangeGroup>
        <DateInput type="date" name="trip-start" label="Trip start" rangeGroup="start" />
        <DateInput type="date" name="trip-end" label="Trip end" rangeGroup="end" />
    </RangeGroup>
);
`}</CodeView>

        <RangeGroup>
            <DateInput type="date" name="trip-start" label="Trip start" rangeGroup="start" />
            <DateInput type="date" name="trip-end" label="Trip end" rangeGroup="end" />
        </RangeGroup>

        <br/><br/><br/><br/>
    </Container>
);

export default DateTime;
